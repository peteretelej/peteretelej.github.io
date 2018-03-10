---
layout: postlayout
title: Ubuntu VPS Setup Guide
subtitle: Setting up your Ubuntu server &middot; VPS Management
labels: [ubuntu, vps, ubuntu 16.04, sysadmin]
thumbnail: https://peteretelej.github.io/images/logos/ubuntu-logo.png
---

<p>This is an overview of how to setup your Ubuntu virtual private server. It's based on a collection of private bitbucket snippets I'd written.</p>

<div class="tags">
<a href="#accessing-vps" class="tag is-info">Accessing VPS</a>
<a href="#user-management" class="tag is-info">Managing Users</a>
<a href="#ssh-lockdown" class="tag is-info">SSH Lockdown</a>
<a href="#update-server" class="tag is-info">Update Server</a>
<a href="#add-swap" class="tag is-info">Add Swap</a>
<a href="#firewall" class="tag is-info">Firewall</a>
</div><!--/.tags-->

<h3 id="accessing-vps">Accessing Your VPS</h3>
<p>After creating a VPS instance (e.g. DigitalOcean droplet or Linode linode), you will be provided an IP address as well as login password. Use the credentials to log into the server.</p>

{% highlight sh lineos %}
ssh root@SERVER_IP_ADDRESS
{% endhighlight %}

<p>Tips regarding authentication:</p>
<ul>
<li>SSH login via root should be disabled <i>(explained in <a href="#ssh-lockdown">SSH Lockdown</a> below)</i></li>
<li>Only use ssh key authentication <i>(explained in <a href="#user-management">User Management</a> below)</i></li>
<li>Use a non-common port for ssh <i>(explained in <a href="#ssh-lockdown">SSH Lockdown</a> below)</i></li>
</ul>


<h3 id="user-management">Managing Users</h3>
<p>By default, only one user exists: <strong>root</strong> - a superuser </p>

<h4>Creating a new user</h4>
<p>Create a new user to avoid using root and it's elevated privileges. While creating a new user, several questions will be asked. You can add additional information about the user but note that only the password is essential.( Press ENTER to skip the rest)</p>
{% highlight sh lineos %}
adduser demouser

# you can now give the user access to root privileges (using sudo) 
gpasswd -a demouser sudo
{% endhighlight %}

<b>Confirm that you can login as this new user</b> before proceeding.
{% highlight sh lineos %}
ssh newuser@SERVER_IP

sudo su - # try to access root as user
{% endhighlight %}

<p class="notification">You can now setup <b>public key authentication</b> (recommended): this enables you to securely login to the server without having to enter your password.
<a class="button is-small is-info" href="#more-ssh-pub" onclick="showBox('more-ssh-pub')" >Read how to do this</a>
</p>
<div class="box hide"  id="more-ssh-pub" >
<h4>Public Key Authentication</h4>
<p>Public Key authentication enables you to login to a server using ssh public key. This is my <b>recommended</b> method of authentication.</p>
<p>SSH Keys come in a pair; a <b>private</b> and <b>public</b> key.</p>
<h6>Generate Key Pair</h6>
<p>OpenSSH client is required, this is most likely already installed. You can install it with <code>sudo apt-get -y install openssh-client</code></p>
<p>Use the following commands to have the key pair generated; accept the defaults by just pressing <kbd>Enter</kbd>. You can leave the password empty (optional). You should use existing keys if you already have them.</p>
{% highlight sh lineos %}
ssh-keygen 

# alternatively you can use this command to generate a stronger key pair, and tag the keys
ssh-keygen -t rsa -b 4096 -C "Email OR Comment describing key"
{% endhighlight %}
<p>The public and private keys will be generate in the default directory <b>~/.ssh</b> as <b>~/.ssh/id_rsa.pub</b> and <b>~/.ssh/id_rsa</b> respectively. The public key (id_rsa.pub) can safely be shared, however, NEVER share your private key <b>(id_rsa)</b>.</p>
<p>In order to login with the generate ssh keys, append the contents of the public key to the following file in the VPS <b>~/.ssh/authorized_keys</b>.</p>

<p>From your computer, you can run either of the following commands. They will require inputting your password once.</p>
{% highlight sh lineos %}
# ssh-copy-id is an command that copies the public key automatically
ssh-copy-id USERNAME@SERVER_IP

# manually copy the public file (one-line)
ssh USERNAME@SERVER_IP "echo \"$(cat ~/.ssh/id_rsa.pub)\" >> .ssh/authorized_keys"
{% endhighlight %}

<p>You can now simply login without entering a password with <code>ssh USERNAME@SERVER_IP</code>.</p>

<p>Disable Password Authentication <i>(Optional)</i>: Edit <code>/etc/ssh/sshd_config</code> </p>
{% highlight sh lineos %}
sudo vi /etc/ssh/sshd_config

# Uncomment and set PasswordAuthentication to no
PasswordAuthentication no

# Ensure the following lines exist in the file
PubkeyAuthentication yes
ChallengeResponseAuthentication no
{% endhighlight %}

<p>Restart ssh service</p>
{% highlight sh lineos %}
sudo systemctl reload sshd
{% endhighlight %}
</div>

<h3 id="ssh-lockdown">SSH Lockdown</h3>
<p>Prevent SSH Login using the <code>root</code> account by changing the SSH daemon's configuration.</p>
<p>Edit <code>/etc/ssh/sshd_config</code> and turn <b>PermitRootLogin</b> to <b>no</b>. Use a different editor if new to <b>vi</b> (ZZ to exit).</p>
<p class="notification is-warning">Before doing this, ensure that you can login with another (non-root) user account (see <a href="#user-management">User Management</a> above).</p> 
{% highlight sh lineos %}
sudo vi /etc/ssh/ssh_config

# Change the following line
PermitRootLogin yes
# to
PermitRootLogin no
{% endhighlight %}

Restart ssh service for this change to effect. 
{% highlight sh lineos %}
sudo service sshd restart
{% endhighlight %}

<p class="notification">I would also recommend using a <b>non-common port for SSH</b>. 
<a class="button is-small is-info" href="#more-ssh-port" onclick="showBox('more-ssh-port')" >Read how to do this</a>
</p>
<div class="box hide"  id="more-ssh-port" >
<h4>Custom SSH Port</h4>
<p>Edit <code>/etc/ssh/sshd_config</code> and change the <b>Port</b> number to a non-common SSH port (just pick an unused number more that 1025, note: don't use 2222, it's common)</p>
{% highlight sh lineos %}
sudo vi /etc/ssh/sshd_config

# Uncomment and change Port number from 
# Port 22
# to 
Port 2222

# Restart ssh daemon service
sudo service sshd restart
{% endhighlight %}



</div><!--/.box-->

<h3 id="initial-information">Update Server</h3>
<ul>
<li>Update server software:
{% highlight sh lineos %}
sudo apt-get update && sudo apt-get upgrade -y
{% endhighlight %}
</li>
<li>Set desired server hostname: As superuser, edit the files <code>/etc/hostname</code> and <code>/etc/hosts</code>. To update without a restart restart, run this: <code>systemctl restart systemd-logind.service</code></li>
<li>Update the timezone, to your desired timezone. Use <code>dpkg-reconfigure tzdata</code></li>
</ul>



<h3 id="add-swap">Add Swap</h3>
<p>Check if swap is already enabled on the server, if enabled, the swap partition will be listed.</p>
{% highlight sh lineos %}
sudo swapon -s 

# alternatively 
free -g
# shows free (and used) physical & swap memory (-g = in gb)
{% endhighlight %}

<p>If swap is not enabled, check the amount disk space you have available.</p>
{% highlight sh lineos %}
df -h
{% endhighlight %}

<p>Create swapfile (usu 2x or 1x your RAM)</p>
{% highlight sh lineos %}
# Fast Method (fallocate e.g creating 1gb swap)
sudo fallocate -l 1G /swapfile

# Slow method (e.g creating 4gb swap)
### sudo dd if=/dev/zero of=/swapfile bs=1G count=4
{% endhighlight %}

<p>Verify space has been allocated</p>
{% highlight sh lineos %}
ls -lh /swapfile
{% endhighlight %}

<p>Enable Swap</p>
{% highlight sh lineos %}
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

#verify it's enabled
sudo swapon -s
{% endhighlight %}

<p>Enable Swap on Reboot/ Start: Edit fstab (<code>/etc/fstab</code>), and add the swap filesystem.</p>
{% highlight sh lineos %}
sudo vi /etc/fstab

# Add this line to /etc/fstab
/swapfile   none    swap    sw    0   0
{% endhighlight %}

<p class="notification">If you are working on a RAM intensive app, e.g Java, consider <b>reducing swappiness</b> and <b>inode cache rate</b>.
<a class="button is-small is-info" href="#more-swappiness" onclick="showBox('more-swappiness')" >Read how to do that</a>
</p>

<div class="box hide"  id="more-swappiness" >
<h4>Tweak Swappiness</h4>
<p>Check the current swappiness (0-100)</p>
{% highlight sh lineos %}
cat /proc/sys/vm/swappiness 
# default is usually 60
{% endhighlight %}

<p>Change swappiness to your desired value.</p>
{% highlight sh lineos %}
sudo sysctl vm.swappiness=20
{% endhighlight %}

<p>Enable on restarts</p>
{% highlight sh lineos %}
sudo vi /etc/sysctl.conf

# Add this line to /etc/sysctl.conf
vm.swappiness=10
{% endhighlight %}

<h4>Inode Cache Rate</h4>
{% highlight sh lineos %}
# Check the current inode cache rate
cat /proc/sys/vm/vfs_cache_pressure #usu 60

# Change to desired value
sudo sysctl vm.vfs_cache_pressure=50

# Add to restarts
sudo vi /etc/sysctl.conf

# Add this line to /etc/sysctl.conf
vm.vfs_cache_pressure = 50
{% endhighlight %}
</div><!--/.box-->

<h3 id="firewall">Configuring a Firewall</h3>
<p><b>UFW</b> <i>(uncomplicated firewall)</i> is a tool that simplifies configuring of <code>iptables</code> to secure your server. It is an easy to use firewall.</p>

<p>Install <b>ufw</b> (most likely already installed)</p>
{% highlight sh lineos %}
sudo apt-get install ufw
{% endhighlight %}
<p>Enable IPv6: Edit <code>/etc/default/ufw</code> and set IPv6=yes</p>
{% highlight sh lineos %}
sudo vi /etc/default/ufw 

# set
IPv6=yes
{% endhighlight %}

<p>Check ufw status and rules (will be inactive if not yet enabled).</p>
{% highlight sh lineos %}
sudo ufw status verbose
{% endhighlight %}

<p>Setup default firewall policies</p>
{% highlight sh lineos %}
sudo ufw default deny incoming
sudo ufw default allow outgoing
{% endhighlight %}

<h5>Allow <b>common connections</b> - only allow what you use</h5>
Allowing SSH connection (default ssh port 22)
{% highlight sh lineos %}
sudo ufw allow ssh
 # same as: sudo ufw allow 22/tcp 
{% endhighlight %}

<p>If you are using different port for SSH (see <a href="#more-ssh-port" onclick="showBox('more-ssh-port')">SSH Lockdown: custom port</a> above), then allow that instead of port 22</p>
{% highlight sh lineos %}
sudo ufw allow 2222/tcp
{% endhighlight %}

<p>Allow HTTP and HTTPS</p>
{% highlight sh lineos %}
sudo ufw allow http
sudo ufw allow https

# the above two commands are the same as                                   
sudo ufw allow 80/tcp                
sudo ufw allow 443/tcp               
{% endhighlight %}                   

<p>Allow SMTP - if sending out mail directly using SMTP</p>
{% highlight sh lineos %}
sudo ufw allow 25/tcp
{% endhighlight %}                   

<p>Check all added exceptions (allowed connections)</p>
{% highlight sh lineos %}
sudo ufw show added
{% endhighlight %}                   

<p>Enable UFW: Also useful when reloading to update configuration</p>
{% highlight sh lineos %}
sudo ufw disable
sudo ufw enable
{% endhighlight %}                   

<h5>Reset UFW</h5>
<p>In case of errors during configuration, you can reset <code>ufw</code> with the following command</p>
{% highlight sh lineos %}
sudo ufw reset
{% endhighlight %}                   

<div class="notification is-warning">                                      
<p>UFW and <b>docker</b>: Docker usually manipulates <code>iptables</code> rules the ufw restrictions will not apply.                                 
<a class="button is-small is-info" href="#more-docker-ufw" onclick="showBox('more-docker-ufw')" >Read how to fix that</a>                         
</p>                                 
</div>                               
<div class="box hide"  id="more-docker-ufw" >                              
<p>Here are a few workarounds I've found useful. You can either:</p>                    
<ol>                                 
<li>Only bind docker containers to loopback interfaces e.g. <code>docker run -p "127.0.0.1:8080:80"</code>.. </li>                                    
<li>Not use port forwarding (<code>-p</code> or <code>-P</code>) esp. if you don't need it.</li>                                                      
<li>                                 
<p>Add <code>--iptables=false</code> to the docker daemon: Uncomment the following line in <code>/etc/default/docker</code></p>                    
{% highlight sh lineos %}            
DOCKER_OPTS="--dns 8.8.8.8 --dns 8.8.4.4 --iptables=false"                 
{% endhighlight %}                   
<p>Restart the docker service for the change to effect <code> sudo service restart docker</code></p>                                                  
 </li>                               
<li>Use the host's network <code>docker run --net host</code>..</li>       
</ol>                                
</div>                               

<hr/>                                
<footer>                             
<h4 id="vps-guides">Relevant Guides & Tutorials</h4>                       
<p>This article is based on snippets, guides and other different sources, some are listed below:</p>                                         
<ul>                                 
<li><a href='https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04' target="_blank" rel="noopener" >Initial Server Setup with Ubuntu 16.04</a></li>
<li><a href='https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-16-04' target="_blank" rel="noopener" >How To Set Up a Firewall with UFW on Ubuntu 16.04</a></li>
<li><a href='https://linode.com/docs/security/securing-your-server/' target="_blank" rel="noopener" >How to Secure Your Server</a></li>
</ul>                                
</footer>                            

